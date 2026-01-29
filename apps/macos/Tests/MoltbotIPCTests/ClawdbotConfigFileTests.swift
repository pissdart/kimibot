import Foundation
import Testing
@testable import Kimibot

@Suite(.serialized)
struct KimibotConfigFileTests {
    @Test
    func configPathRespectsEnvOverride() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("kimibot-config-\(UUID().uuidString)")
            .appendingPathComponent("kimibot.json")
            .path

        await TestIsolation.withEnvValues(["KIMIBOT_CONFIG_PATH": override]) {
            #expect(KimibotConfigFile.url().path == override)
        }
    }

    @MainActor
    @Test
    func remoteGatewayPortParsesAndMatchesHost() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("kimibot-config-\(UUID().uuidString)")
            .appendingPathComponent("kimibot.json")
            .path

        await TestIsolation.withEnvValues(["KIMIBOT_CONFIG_PATH": override]) {
            KimibotConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "ws://gateway.ts.net:19999",
                    ],
                ],
            ])
            #expect(KimibotConfigFile.remoteGatewayPort() == 19999)
            #expect(KimibotConfigFile.remoteGatewayPort(matchingHost: "gateway.ts.net") == 19999)
            #expect(KimibotConfigFile.remoteGatewayPort(matchingHost: "gateway") == 19999)
            #expect(KimibotConfigFile.remoteGatewayPort(matchingHost: "other.ts.net") == nil)
        }
    }

    @MainActor
    @Test
    func setRemoteGatewayUrlPreservesScheme() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("kimibot-config-\(UUID().uuidString)")
            .appendingPathComponent("kimibot.json")
            .path

        await TestIsolation.withEnvValues(["KIMIBOT_CONFIG_PATH": override]) {
            KimibotConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "wss://old-host:111",
                    ],
                ],
            ])
            KimibotConfigFile.setRemoteGatewayUrl(host: "new-host", port: 2222)
            let root = KimibotConfigFile.loadDict()
            let url = ((root["gateway"] as? [String: Any])?["remote"] as? [String: Any])?["url"] as? String
            #expect(url == "wss://new-host:2222")
        }
    }

    @Test
    func stateDirOverrideSetsConfigPath() async {
        let dir = FileManager().temporaryDirectory
            .appendingPathComponent("kimibot-state-\(UUID().uuidString)", isDirectory: true)
            .path

        await TestIsolation.withEnvValues([
            "KIMIBOT_CONFIG_PATH": nil,
            "KIMIBOT_STATE_DIR": dir,
        ]) {
            #expect(KimibotConfigFile.stateDirURL().path == dir)
            #expect(KimibotConfigFile.url().path == "\(dir)/kimibot.json")
        }
    }
}

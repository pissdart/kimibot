// swift-tools-version: 6.2
// Package manifest for the Kimibot macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "Kimibot",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "KimibotIPC", targets: ["KimibotIPC"]),
        .library(name: "KimibotDiscovery", targets: ["KimibotDiscovery"]),
        .executable(name: "Kimibot", targets: ["Kimibot"]),
        .executable(name: "kimibot-mac", targets: ["KimibotMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/KimibotKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "KimibotIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "KimibotDiscovery",
            dependencies: [
                .product(name: "KimibotKit", package: "KimibotKit"),
            ],
            path: "Sources/KimibotDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "Kimibot",
            dependencies: [
                "KimibotIPC",
                "KimibotDiscovery",
                .product(name: "KimibotKit", package: "KimibotKit"),
                .product(name: "KimibotChatUI", package: "KimibotKit"),
                .product(name: "KimibotProtocol", package: "KimibotKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/Kimibot.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "KimibotMacCLI",
            dependencies: [
                "KimibotDiscovery",
                .product(name: "KimibotKit", package: "KimibotKit"),
                .product(name: "KimibotProtocol", package: "KimibotKit"),
            ],
            path: "Sources/KimibotMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "KimibotIPCTests",
            dependencies: [
                "KimibotIPC",
                "Kimibot",
                "KimibotDiscovery",
                .product(name: "KimibotProtocol", package: "KimibotKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])

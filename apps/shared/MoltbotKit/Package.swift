// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "KimibotKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "KimibotProtocol", targets: ["KimibotProtocol"]),
        .library(name: "KimibotKit", targets: ["KimibotKit"]),
        .library(name: "KimibotChatUI", targets: ["KimibotChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "KimibotProtocol",
            path: "Sources/KimibotProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "KimibotKit",
            dependencies: [
                "KimibotProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/KimibotKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "KimibotChatUI",
            dependencies: [
                "KimibotKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/KimibotChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "KimibotKitTests",
            dependencies: ["KimibotKit", "KimibotChatUI"],
            path: "Tests/KimibotKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])

import Foundation

public enum KimibotCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum KimibotCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum KimibotCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum KimibotCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct KimibotCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: KimibotCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: KimibotCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: KimibotCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: KimibotCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct KimibotCameraClipParams: Codable, Sendable, Equatable {
    public var facing: KimibotCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: KimibotCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: KimibotCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: KimibotCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}

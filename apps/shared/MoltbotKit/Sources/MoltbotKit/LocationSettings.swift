import Foundation

public enum KimibotLocationMode: String, Codable, Sendable, CaseIterable {
    case off
    case whileUsing
    case always
}

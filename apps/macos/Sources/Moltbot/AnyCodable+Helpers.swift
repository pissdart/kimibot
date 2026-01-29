import KimibotKit
import KimibotProtocol
import Foundation

// Prefer the KimibotKit wrapper to keep gateway request payloads consistent.
typealias AnyCodable = KimibotKit.AnyCodable
typealias InstanceIdentity = KimibotKit.InstanceIdentity

extension AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: AnyCodable]? { self.value as? [String: AnyCodable] }
    var arrayValue: [AnyCodable]? { self.value as? [AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

extension KimibotProtocol.AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: KimibotProtocol.AnyCodable]? { self.value as? [String: KimibotProtocol.AnyCodable] }
    var arrayValue: [KimibotProtocol.AnyCodable]? { self.value as? [KimibotProtocol.AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: KimibotProtocol.AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [KimibotProtocol.AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

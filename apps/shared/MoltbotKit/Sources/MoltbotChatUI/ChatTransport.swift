import Foundation

public enum KimibotChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(KimibotChatEventPayload)
    case agent(KimibotAgentEventPayload)
    case seqGap
}

public protocol KimibotChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> KimibotChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [KimibotChatAttachmentPayload]) async throws -> KimibotChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> KimibotChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<KimibotChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension KimibotChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "KimibotChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> KimibotChatSessionsListResponse {
        throw NSError(
            domain: "KimibotChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}

package bot.molt.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class KimibotProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", KimibotCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", KimibotCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", KimibotCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", KimibotCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", KimibotCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", KimibotCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", KimibotCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", KimibotCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", KimibotCapability.Canvas.rawValue)
    assertEquals("camera", KimibotCapability.Camera.rawValue)
    assertEquals("screen", KimibotCapability.Screen.rawValue)
    assertEquals("voiceWake", KimibotCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", KimibotScreenCommand.Record.rawValue)
  }
}

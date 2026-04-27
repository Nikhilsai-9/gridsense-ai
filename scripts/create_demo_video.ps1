$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "demo-video"
$screenDir = Join-Path $outputDir "screens"
$audioDir = Join-Path $outputDir "audio"

New-Item -ItemType Directory -Force -Path $outputDir, $audioDir | Out-Null

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft Zira Desktop")
$synth.Rate = 0
$synth.Volume = 100

$slides = @(
  @{
    Title = "GridSense AI"
    Body = "Hello. This is our project GridSense A I. It helps BESCOM understand smart meter data in a simple way."
    Caption = "Simple smart meter intelligence for BESCOM"
    Image = Join-Path $screenDir "hero.png"
    Duration = 8
  },
  @{
    Title = "Main Dashboard"
    Body = "This is the main dashboard. It shows the overall system view, demand information, and risk zones in one place."
    Caption = "Main dashboard with demand and zone risk view"
    Image = Join-Path $screenDir "hero.png"
    Duration = 9
  },
  @{
    Title = "Live Demo"
    Body = "Here the demo shows a risky meter. It also shows the possible revenue loss and the next action for the officer."
    Caption = "Live demo with alert, loss, and next action"
    Image = Join-Path $screenDir "demo-live.png"
    Duration = 10
  },
  @{
    Title = "Useful Features"
    Body = "The system can predict demand, detect unusual usage, support human review, and help make better field decisions."
    Caption = "Forecasting, alerts, and simple officer support"
    Image = Join-Path $screenDir "dashboard.png"
    Duration = 9
  },
  @{
    Title = "Why It Helps"
    Body = "In real life, this can help reduce theft, save time, and support faster recovery. It does not replace officers. It helps them work in a smarter way."
    Caption = "Simple, useful, and easy to understand"
    Image = Join-Path $screenDir "hero.png"
    Duration = 10
  }
)

for ($i = 0; $i -lt $slides.Count; $i++) {
  $wavPath = Join-Path $audioDir ("slide-" + ($i + 1).ToString("00") + ".wav")
  $synth.SetOutputToWaveFile($wavPath)
  $synth.Speak($slides[$i].Body)
  $synth.SetOutputToDefaultAudioDevice()
  $slides[$i].Audio = $wavPath
}

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = -1
$presentation = $ppt.Presentations.Add()
$presentation.PageSetup.SlideSize = 16

function Add-TextBox($slide, $left, $top, $width, $height, $text, $fontSize, $bold, $color, $name) {
  $shape = $slide.Shapes.AddTextbox(1, $left, $top, $width, $height)
  $shape.Name = $name
  $shape.TextFrame.TextRange.Text = $text
  $shape.TextFrame.TextRange.Font.Size = $fontSize
  $shape.TextFrame.TextRange.Font.Name = "Aptos"
  $shape.TextFrame.TextRange.Font.Color.RGB = $color
  return $shape
}

for ($i = 0; $i -lt $slides.Count; $i++) {
  $data = $slides[$i]
  $slide = $presentation.Slides.Add($i + 1, 12)
  $slide.FollowMasterBackground = $false
  $slide.Background.Fill.ForeColor.RGB = 16777215

  $band = $slide.Shapes.AddShape(1, 0, 0, 960, 40)
  $band.Fill.ForeColor.RGB = 505933
  $band.Line.Visible = 0

  Add-TextBox $slide 30 18 340 40 $data.Title 24 -1 505933 "Title" | Out-Null
  Add-TextBox $slide 30 58 420 40 $data.Caption 14 0 7697781 "Caption" | Out-Null

  $img = $slide.Shapes.AddPicture($data.Image, 0, -1, 30, 110, 560, 315)
  $img.Line.Visible = 0

  $bodyBox = $slide.Shapes.AddShape(1, 620, 110, 280, 315)
  $bodyBox.Fill.ForeColor.RGB = 16314863
  $bodyBox.Line.ForeColor.RGB = 15132648
  $bodyBox.Line.Weight = 1.25

  $bodyText = Add-TextBox $slide 640 135 240 255 $data.Body 18 0 2236962 "Body"
  $bodyText.TextFrame2.TextRange.ParagraphFormat.SpaceAfter = 8

  $footer = $slide.Shapes.AddShape(1, 30, 450, 870, 40)
  $footer.Fill.ForeColor.RGB = 15791615
  $footer.Line.Visible = 0
  $footer.TextFrame.TextRange.Text = "GridSense AI demo for hackathon presentation"
  $footer.TextFrame.TextRange.Font.Name = "Aptos"
  $footer.TextFrame.TextRange.Font.Size = 14
  $footer.TextFrame.TextRange.Font.Color.RGB = 2236962

  $audioShape = $slide.Shapes.AddMediaObject2($data.Audio, $false, $true, 5, 5, 10, 10)
  $audioShape.AnimationSettings.PlaySettings.PlayOnEntry = $true
  $audioShape.AnimationSettings.PlaySettings.HideWhileNotPlaying = $true
  $audioShape.AnimationSettings.PlaySettings.LoopUntilStopped = $false

  $slide.SlideShowTransition.AdvanceOnTime = $true
  $slide.SlideShowTransition.AdvanceTime = $data.Duration
}

$pptxPath = Join-Path $outputDir "GridSense_AI_Demo_Video.pptx"
$videoPath = Join-Path $outputDir "GridSense_AI_Demo_Video.mp4"

$presentation.SaveAs($pptxPath, 24)
$presentation.CreateVideo($videoPath, $true, 8, 720, 24, 80)

while ($true) {
  $status = $presentation.CreateVideoStatus
  if ($status -eq 3) { break }
  if ($status -eq 4) { throw "PowerPoint video export failed." }
  Start-Sleep -Seconds 2
}

$presentation.Close()
$ppt.Quit()

Write-Output "PPTX: $pptxPath"
Write-Output "VIDEO: $videoPath"

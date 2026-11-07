Add-Type -AssemblyName System.Drawing

$width = 1360
$height = 760
$bmp = New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# 1. Gym supplements on right side
$gym = [System.Drawing.Image]::FromFile("c:\Programming\FIT BARI\public\images\gym-supplements.png")
$g.DrawImage($gym, 460, 40, 900, 700)
$gym.Dispose()

# 2. Honey harvest on the left-center (placed down so dipper top is at y=80)
$honey = [System.Drawing.Image]::FromFile("c:\Programming\FIT BARI\public\images\honey-harvest.png")
$g.DrawImage($honey, 60, 160, 640, 560)
$honey.Dispose()

# 3. Nuts and dry fruits in foreground
$nuts = [System.Drawing.Image]::FromFile("c:\Programming\FIT BARI\public\images\nuts-dry-fruits.png")
$g.DrawImage($nuts, 200, 360, 640, 380)
$nuts.Dispose()

$bmp.Save("c:\Programming\FIT BARI\public\images\combo-packages.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Output "Composite combo-packages.png refined successfully"

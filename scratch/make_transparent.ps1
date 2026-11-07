Add-Type -AssemblyName System.Drawing

function Convert-WhiteToTransparent($sourcePath, $destPath, $threshold = 245) {
    $src = [System.Drawing.Bitmap]::FromFile($sourcePath)
    $w = $src.Width
    $h = $src.Height
    $dest = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $bytes = $srcData.Stride * $h
    $srcBuffer = New-Object byte[] $bytes
    $destBuffer = New-Object byte[] $bytes
    
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBuffer, 0, $bytes)
    
    for ($i = 0; $i -lt $bytes; $i += 4) {
        $b = $srcBuffer[$i]
        $g = $srcBuffer[$i + 1]
        $r = $srcBuffer[$i + 2]
        
        # Check brightness
        $minC = [Math]::Min($r, [Math]::Min($g, $b))
        if ($minC -ge $threshold) {
            # Fully transparent
            $destBuffer[$i] = 0
            $destBuffer[$i + 1] = 0
            $destBuffer[$i + 2] = 0
            $destBuffer[$i + 3] = 0
        } elseif ($minC -gt ($threshold - 20)) {
            # Soft feathered edge
            $alpha = [byte](255 * (1.0 - ($minC - ($threshold - 20)) / 20.0))
            $destBuffer[$i] = $b
            $destBuffer[$i + 1] = $g
            $destBuffer[$i + 2] = $r
            $destBuffer[$i + 3] = $alpha
        } else {
            $destBuffer[$i] = $b
            $destBuffer[$i + 1] = $g
            $destBuffer[$i + 2] = $r
            $destBuffer[$i + 3] = 255
        }
    }
    
    [System.Runtime.InteropServices.Marshal]::Copy($destBuffer, 0, $destData.Scan0, $bytes)
    
    $src.UnlockBits($srcData)
    $dest.UnlockBits($destData)
    $src.Dispose()
    
    $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Output "Created transparent PNG: $destPath"
}

Convert-WhiteToTransparent "c:\Programming\FIT BARI\public\images\healthy-foods.jpg" "c:\Programming\FIT BARI\public\images\healthy-foods.png"
Convert-WhiteToTransparent "c:\Programming\FIT BARI\public\images\ghee-natural-oils.jpg" "c:\Programming\FIT BARI\public\images\ghee-natural-oils.png"
Convert-WhiteToTransparent "c:\Programming\FIT BARI\public\images\dates-superfoods.jpg" "c:\Programming\FIT BARI\public\images\dates-superfoods.png"


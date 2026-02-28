# Abipesca - Assets Android

Guia completo dos assets visuais necessários para o aplicativo Android.

## Densidades de Tela Android

O Android usa diferentes densidades de pixel (DPI) para suportar diversas resoluções de tela. Cada asset deve existir em múltiplas versões:

| Densidade | Multiplicador | DPI | Exemplo de Tela |
|-----------|--------------|-----|-----------------|
| mdpi | 1x | ~160 dpi | Telas de baixa resolução |
| hdpi | 1.5x | ~240 dpi | Telas médias |
| xhdpi | 2x | ~320 dpi | A maioria dos smartphones |
| xxhdpi | 3x | ~480 dpi | Smartphones high-end |
| xxxhdpi | 4x | ~640 dpi | Smartphones premium |

## Ícone do App

### Tamanhos por Densidade

O ícone do app tem tamanho base de **48dp**:

| Densidade | Tamanho (px) | Arquivo |
|-----------|-------------|---------|
| mdpi | 48 x 48 | `mipmap-mdpi/appicon.png` |
| hdpi | 72 x 72 | `mipmap-hdpi/appicon.png` |
| xhdpi | 96 x 96 | `mipmap-xhdpi/appicon.png` |
| xxhdpi | 144 x 144 | `mipmap-xxhdpi/appicon.png` |
| xxxhdpi | 192 x 192 | `mipmap-xxxhdpi/appicon.png` |

### Ícone Adaptativo (Android 8.0+)

A partir do Android 8.0 (API 26), ícones adaptativos usam duas camadas separadas:

- **Background (fundo):** Cor sólida navy `#203e64` — tamanho base 108dp
- **Foreground (frente):** Logo dos peixes com safe zone de 66dp

A safe zone garante que o conteúdo principal (peixes) fique visível independente da máscara aplicada pelo sistema (circular, squircle, quadrado arredondado, etc).

| Densidade | Layer (px) | Arquivos |
|-----------|-----------|----------|
| mdpi | 108 x 108 | `mipmap-mdpi/appicon_foreground.png`, `appicon_background.png` |
| hdpi | 162 x 162 | `mipmap-hdpi/appicon_foreground.png`, `appicon_background.png` |
| xhdpi | 216 x 216 | `mipmap-xhdpi/appicon_foreground.png`, `appicon_background.png` |
| xxhdpi | 324 x 324 | `mipmap-xxhdpi/appicon_foreground.png`, `appicon_background.png` |
| xxxhdpi | 432 x 432 | `mipmap-xxxhdpi/appicon_foreground.png`, `appicon_background.png` |

O arquivo `adaptive-icon/ic_launcher.xml` é um exemplo de como referenciar essas camadas no AndroidManifest.

### Ícone Redondo

Algumas versões do Android exibem ícones redondos. Os arquivos `appicon_round.png` em cada pasta mipmap são versões circulares do ícone.

## Ícone de Notificação

Ícones de notificação no Android devem ser:
- **Monocromáticos:** Apenas branco (`#FFFFFF`) sobre fundo transparente
- **Sem cores ou gradientes:** O sistema aplica a cor automaticamente
- **Simples:** Deve ser reconhecível em tamanhos muito pequenos

| Densidade | Tamanho (px) | Arquivo |
|-----------|-------------|---------|
| mdpi | 24 x 24 | `notification/mdpi/ic_notification.png` |
| hdpi | 36 x 36 | `notification/hdpi/ic_notification.png` |
| xhdpi | 48 x 48 | `notification/xhdpi/ic_notification.png` |
| xxhdpi | 72 x 72 | `notification/xxhdpi/ic_notification.png` |
| xxxhdpi | 96 x 96 | `notification/xxxhdpi/ic_notification.png` |

## Splash Screen

O logo da splash screen fica em `drawable/splash_logo.png` (288 x 288 px). A cor de fundo (`#203e64`) é definida no código, não na imagem.

## Google Play Store

Assets necessários para publicar na Play Store:

| Asset | Dimensões | Arquivo |
|-------|-----------|---------|
| Ícone do app | 512 x 512 px | `playstore/app-icon-512.png` |
| Feature graphic | 1024 x 500 px | `playstore/feature-graphic.png` |

### Screenshots

Para publicar na Play Store, você precisa de screenshots do app em funcionamento:

**Telefone:**
- Mínimo: 2 screenshots
- Máximo: 8 screenshots
- Resolução recomendada: 1080 x 1920 px (retrato) ou 1920 x 1080 px (paisagem)
- Proporção: entre 16:9 e 9:16
- Formato: PNG ou JPEG

**Tablet 7":**
- Resolução recomendada: 1200 x 1920 px

**Tablet 10":**
- Resolução recomendada: 1600 x 2560 px

## Como Copiar para o Projeto MAUI

No .NET MAUI, os ícones são gerados automaticamente a partir de SVGs. Para atualizar:

1. Copie `source/app-icon-background.svg` para `Mobile/Abipesca.Main/Resources/AppIcon/appicon.svg`
2. Copie `source/app-icon-foreground.svg` para `Mobile/Abipesca.Main/Resources/AppIcon/appiconfg.svg`
3. Atualize as cores no `.csproj` de `#512BD4` para `#203e64`
4. Atualize `Platforms/Android/Resources/values/colors.xml` com as cores da marca

O MAUI gera automaticamente os mipmap e ícones adaptativos durante o build.

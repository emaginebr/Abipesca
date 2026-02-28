# Abipesca - Assets iOS / iPhone

Guia completo dos assets visuais necessários para o aplicativo iOS.

## App Icon Set

O iOS requer o ícone do app em múltiplos tamanhos para diferentes contextos de uso. Todos os ícones ficam na pasta `AppIcon.appiconset/` com um arquivo `Contents.json` que mapeia cada tamanho.

### Tamanhos Necessários

#### iPhone

| Contexto | Tamanho Base | Scale | Pixels | Arquivo |
|----------|-------------|-------|--------|---------|
| Notificação | 20x20 pt | @2x | 40 x 40 | `icon-20@2x.png` |
| Notificação | 20x20 pt | @3x | 60 x 60 | `icon-20@3x.png` |
| Ajustes | 29x29 pt | @2x | 58 x 58 | `icon-29@2x.png` |
| Ajustes | 29x29 pt | @3x | 87 x 87 | `icon-29@3x.png` |
| Spotlight | 40x40 pt | @2x | 80 x 80 | `icon-40@2x.png` |
| Spotlight | 40x40 pt | @3x | 120 x 120 | `icon-40@3x.png` |
| App Icon | 60x60 pt | @2x | 120 x 120 | `icon-60@2x.png` |
| App Icon | 60x60 pt | @3x | 180 x 180 | `icon-60@3x.png` |

#### iPad

| Contexto | Tamanho Base | Scale | Pixels | Arquivo |
|----------|-------------|-------|--------|---------|
| Notificação | 20x20 pt | @1x | 20 x 20 | `icon-20@2x.png`* |
| Notificação | 20x20 pt | @2x | 40 x 40 | `icon-20@2x.png` |
| Ajustes | 29x29 pt | @1x | 29 x 29 | `icon-29@2x.png`* |
| Ajustes | 29x29 pt | @2x | 58 x 58 | `icon-29@2x.png` |
| Spotlight | 40x40 pt | @1x | 40 x 40 | `icon-40@2x.png`* |
| Spotlight | 40x40 pt | @2x | 80 x 80 | `icon-40@2x.png` |
| App Icon | 76x76 pt | @1x | 76 x 76 | `icon-76@1x.png` |
| App Icon | 76x76 pt | @2x | 152 x 152 | `icon-76@2x.png` |
| iPad Pro | 83.5x83.5 pt | @2x | 167 x 167 | `icon-83.5@2x.png` |

*\* Alguns tamanhos de iPad reutilizam arquivos de tamanhos maiores no `Contents.json`*

#### App Store

| Contexto | Pixels | Arquivo |
|----------|--------|---------|
| App Store | 1024 x 1024 | `icon-1024.png` |

### Regras Importantes

- **Sem transparência:** Ícones iOS não podem ter fundo transparente
- **Sem cantos arredondados:** O iOS aplica a máscara automaticamente
- **Formato PNG** obrigatório
- **sRGB ou P3** como espaço de cor

## Contents.json

O arquivo `AppIcon.appiconset/Contents.json` é o manifesto do Xcode Asset Catalog. Ele mapeia cada combinação de idiom (iphone/ipad), tamanho e escala para o respectivo arquivo PNG.

Para usar no Xcode:
1. Copie a pasta `AppIcon.appiconset/` inteira
2. Cole dentro do `Assets.xcassets` do projeto

## Launch Screen (Tela de Splash)

Assets para a tela de carregamento do app:

| Scale | Pixels | Arquivo |
|-------|--------|---------|
| @1x | 128 x 128 | `launch/splash-logo@1x.png` |
| @2x | 256 x 256 | `launch/splash-logo@2x.png` |
| @3x | 384 x 384 | `launch/splash-logo@3x.png` |

A cor de fundo da splash screen (`#203e64`) é definida no código (storyboard/SwiftUI), não na imagem.

## App Store

### Ícone da App Store

O ícone para a App Store deve ter exatamente **1024 x 1024 px** em PNG sem transparência.

Arquivo: `appstore/app-icon-1024.png`

### Screenshots

Para publicar na App Store, são necessários screenshots do app:

**iPhone 6.7" (obrigatório para novos apps):**
- Resolução: 1290 x 2796 px
- Mínimo: 1 screenshot
- Máximo: 10 screenshots

**iPhone 6.5":**
- Resolução: 1284 x 2778 px

**iPhone 5.5":**
- Resolução: 1242 x 2208 px

**iPad Pro 12.9" (obrigatório se suporta iPad):**
- Resolução: 2048 x 2732 px
- Mínimo: 1 screenshot
- Máximo: 10 screenshots

### Dicas para Screenshots

- Use screenshots reais do app em funcionamento
- Evite mostrar a barra de status do sistema
- Pode adicionar textos explicativos e molduras de dispositivo
- Formato: PNG ou JPEG
- Sem transparência

## Como Integrar no Projeto MAUI

No .NET MAUI, o ícone do iOS é gerado automaticamente a partir de SVG:

1. Copie `source/app-icon-combined.svg` redimensionado para `Mobile/Abipesca.Main/Resources/AppIcon/`
2. O MAUI gera automaticamente todos os tamanhos durante o build
3. Atualize a cor de fundo no `.csproj` de `#512BD4` para `#203e64`

Alternativamente, para controle total dos ícones iOS:
1. Copie a pasta `AppIcon.appiconset/` com os PNGs gerados
2. Cole em `Mobile/Abipesca.Main/Platforms/iOS/Assets.xcassets/`

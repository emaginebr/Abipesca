# Abipesca - Assets de Design

Diretório centralizado com todos os assets visuais, ícones e imagens necessários para o aplicativo Abipesca nas plataformas Android e iOS.

## Identidade Visual

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Navy | `#203e64` | Fundo principal, cor primária escura |
| Blue | `#0693e3` | Peixe superior, acentos, links |
| Orange | `#ff6900` | Peixe inferior, acentos, CTAs |
| Gray | `#32373c` | Texto, elementos neutros |
| Branco | `#FFFFFF` | Texto sobre fundo escuro, foreground |

### Logo

O logo Abipesca consiste em dois peixes estilizados sobrepostos (um azul/teal, um laranja/dourado) com o texto "ABIPESCA" abaixo.

- **Referência original:** `admin/public/abipesca-logo.png`
- **SVGs fonte:** `design/source/`

### Tipografia

- **Fonte principal:** Open Sans (Regular e Semibold)
- Arquivos disponíveis em `Mobile/Abipesca.Main/Resources/Fonts/`

## Estrutura de Diretórios

```
design/
├── README.md                    ← Este arquivo
├── source/                      ← SVGs fonte (editáveis)
│   ├── app-icon-background.svg  ← Fundo navy sólido (ícone adaptativo)
│   ├── app-icon-foreground.svg  ← Peixes estilizados (ícone adaptativo)
│   ├── app-icon-combined.svg    ← Ícone completo 1024x1024
│   ├── notification-icon.svg    ← Silhueta branca para notificações
│   ├── splash-logo.svg          ← Logo para tela de splash
│   └── feature-graphic.svg      ← Banner Google Play Store
├── scripts/                     ← Scripts de geração automática
│   ├── Generate-Android.ps1     ← Gera PNGs para Android
│   ├── Generate-iOS.ps1         ← Gera PNGs para iOS
│   └── Generate-All.ps1        ← Gera tudo de uma vez
├── android/                     ← Assets prontos para Android
│   └── (ver android/README.md)
└── iphone/                      ← Assets prontos para iOS
    └── (ver iphone/README.md)
```

## Como Gerar os Assets PNG

### Pré-requisitos

Instale o [Inkscape](https://inkscape.org/release/) (necessário para converter SVG → PNG):

```powershell
# Via winget (Windows Package Manager)
winget install Inkscape.Inkscape
```

### Gerando todos os assets

```powershell
# Gerar para ambas plataformas
.\design\scripts\Generate-All.ps1

# Gerar apenas Android
.\design\scripts\Generate-Android.ps1

# Gerar apenas iOS
.\design\scripts\Generate-iOS.ps1

# Especificando caminho do Inkscape manualmente
.\design\scripts\Generate-All.ps1 -InkscapePath "C:\Program Files\Inkscape\bin\inkscape.exe"
```

## Integração com o Projeto MAUI

Após gerar os PNGs, para integrar os novos assets no app mobile:

### 1. Ícone do App

Copie os SVGs fonte para o projeto MAUI:

- `source/app-icon-background.svg` → `Mobile/Abipesca.Main/Resources/AppIcon/appicon.svg`
- `source/app-icon-foreground.svg` → `Mobile/Abipesca.Main/Resources/AppIcon/appiconfg.svg`

E atualize o `.csproj` para usar a cor navy:

```xml
<MauiIcon Include="Resources\AppIcon\appicon.svg"
          ForegroundFile="Resources\AppIcon\appiconfg.svg"
          Color="#203e64" />
```

### 2. Tela de Splash

Copie o SVG:

- `source/splash-logo.svg` → `Mobile/Abipesca.Main/Resources/Splash/splash.svg`

E atualize a cor no `.csproj`:

```xml
<MauiSplashScreen Include="Resources\Splash\splash.svg"
                   Color="#203e64"
                   BaseSize="128,128" />
```

### 3. Cores do Android

Atualize `Mobile/Abipesca.Main/Platforms/Android/Resources/values/colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#203e64</color>
    <color name="colorPrimaryDark">#1a3250</color>
    <color name="colorAccent">#0693e3</color>
</resources>
```

## Especificações para as Lojas

### Google Play Store

| Asset | Dimensões | Formato |
|-------|-----------|---------|
| Ícone do app | 512 x 512 px | PNG 32-bit |
| Feature graphic | 1024 x 500 px | PNG ou JPEG |
| Screenshots (telefone) | min 320px, max 3840px (lado menor) | PNG ou JPEG |
| Screenshots (tablet 7") | min 320px, max 3840px | PNG ou JPEG |
| Screenshots (tablet 10") | min 320px, max 3840px | PNG ou JPEG |

Recomendações para screenshots:
- Mínimo 2 screenshots por tipo de dispositivo
- Máximo 8 screenshots por tipo
- Proporção 16:9 ou 9:16
- Resolução recomendada: 1080 x 1920 px (telefone)

### Apple App Store

| Asset | Dimensões | Formato |
|-------|-----------|---------|
| Ícone do app | 1024 x 1024 px | PNG (sem transparência) |
| Screenshots iPhone 6.7" | 1290 x 2796 px | PNG ou JPEG |
| Screenshots iPhone 6.5" | 1284 x 2778 px | PNG ou JPEG |
| Screenshots iPhone 5.5" | 1242 x 2208 px | PNG ou JPEG |
| Screenshots iPad 12.9" | 2048 x 2732 px | PNG ou JPEG |

Recomendações para screenshots:
- Mínimo 1 screenshot por tamanho obrigatório
- Máximo 10 screenshots por tamanho
- Sem transparência nos ícones iOS

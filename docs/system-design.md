# Abipesca - System Design

```mermaid
graph TB
    subgraph Clients
        Browser["🖥️ Browser"]
        MobileApp["📱 Mobile App<br/>.NET MAUI"]
    end

    subgraph Docker["Docker Network (abipesca-network)"]

        subgraph Nginx["Nginx :80"]
            direction LR
            AdminSPA["React SPA<br/>/admin"]
            ProxyAuth["/api/nauth/ →"]
            ProxyNews["/api/nnews/ →"]
            ProxyBazzuca["/api/bazzuca/ →"]
        end

        subgraph APIs["Backend APIs (.NET 8)"]
            NAuthAPI["NAuth API :80<br/>Auth · Users · Roles"]
            NNewsAPI["NNews API :8080<br/>Articles · Categories · Tags"]
            BazzucaAPI["Bazzuca API :8080<br/>Clients · Posts · Calendar"]
            ZToolsAPI["zTools API :8080<br/>Mail · ChatGPT · S3"]
        end

        subgraph Data["Data Layer"]
            Postgres[("PostgreSQL 16<br/>Database: abipesca<br/>:5432")]
        end

    end

    subgraph External["External Services"]
        ChatGPT["OpenAI API<br/>ChatGPT"]
        MailerSend["MailerSend<br/>Email"]
        S3["S3<br/>File Storage"]
    end

    Browser -->|HTTP :80| Nginx
    MobileApp -->|HTTP :80| Nginx

    ProxyAuth --> NAuthAPI
    ProxyNews --> NNewsAPI
    ProxyBazzuca --> BazzucaAPI

    NAuthAPI -->|Npgsql/EF Core| Postgres
    NNewsAPI -->|Npgsql/EF Core| Postgres
    BazzucaAPI -->|Npgsql/EF Core| Postgres

    NAuthAPI -->|HTTP| ZToolsAPI
    NNewsAPI -->|HTTP| ZToolsAPI
    BazzucaAPI -->|HTTP| ZToolsAPI

    NNewsAPI -.->|JWT Validation<br/>Shared Secret| NAuthAPI
    BazzucaAPI -.->|JWT Validation<br/>Shared Secret| NAuthAPI

    ZToolsAPI --> ChatGPT
    ZToolsAPI --> MailerSend
    ZToolsAPI --> S3

    style Nginx fill:#203e64,color:#fff
    style NAuthAPI fill:#0693e3,color:#fff
    style NNewsAPI fill:#0693e3,color:#fff
    style BazzucaAPI fill:#0693e3,color:#fff
    style ZToolsAPI fill:#ff6900,color:#fff
    style Postgres fill:#336791,color:#fff
    style AdminSPA fill:#61dafb,color:#000
```

## Build Pipeline (Nginx Dockerfile - Multi-stage)

```mermaid
graph LR
    A["nauth-react<br/>npm run build"] --> B["nnews-react<br/>npm run build"]
    B --> C["bazzuca-react<br/>npm run build"]
    C --> D["admin/<br/>npm run build"]
    D --> E["Nginx<br/>serves admin/dist"]

    style A fill:#0693e3,color:#fff
    style B fill:#0693e3,color:#fff
    style C fill:#0693e3,color:#fff
    style D fill:#61dafb,color:#000
    style E fill:#203e64,color:#fff
```

## Frontend Provider Architecture

```mermaid
graph TD
    App["App"] --> Router["BrowserRouter<br/>basename=/admin"]
    Router --> AuthProvider["NAuthProvider<br/>Auth + JWT Token"]
    AuthProvider --> NewsProvider["NNewsProvider<br/>authHeaders from useAuth()"]
    NewsProvider --> BazzucaProvider["BazzucaProvider<br/>authHeaders from useAuth()"]
    BazzucaProvider --> Routes["Routes<br/>ProtectedRoute"]

    style AuthProvider fill:#0693e3,color:#fff
    style NewsProvider fill:#0693e3,color:#fff
    style BazzucaProvider fill:#0693e3,color:#fff
    style Routes fill:#ff6900,color:#fff
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 · Vite 7 · TypeScript 5.9 · Tailwind 3.4 |
| UI Libraries | lucide-react · sonner · react-quill-new · @radix-ui/react-dialog |
| Backend APIs | .NET 8 · ASP.NET Core |
| Database | PostgreSQL 16 · Npgsql · EF Core |
| Auth | JWT (shared secret across all APIs) |
| Mobile | .NET MAUI |
| Infrastructure | Docker · Nginx · docker-compose |
| External | OpenAI · MailerSend · S3 |

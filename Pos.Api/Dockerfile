FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5117
ENV ASPNETCORE_URLS=http://+:5117
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG configuration=Release
WORKDIR /src
COPY Pos.Api/Pos.Api.csproj Pos.Api/
COPY Directory.Build.props Directory.Packages.props ./
RUN dotnet restore "Pos.Api/Pos.Api.csproj"
COPY . .
WORKDIR "/src/Pos.Api"
RUN dotnet build "Pos.Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Pos.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pos.Api.dll"]

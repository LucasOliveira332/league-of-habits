FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["LeagueOfHabits.Server/LeagueOfHabits.Server.csproj", "LeagueOfHabits.Server/"]
RUN dotnet restore "LeagueOfHabits.Server/LeagueOfHabits.Server.csproj"
COPY . .
WORKDIR "/src/LeagueOfHabits.Server"
RUN dotnet build "LeagueOfHabits.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LeagueOfHabits.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LeagueOfHabits.Server.dll"]
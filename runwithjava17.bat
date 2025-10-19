@echo off
REM Set Java 17 for this project only
REM Update this path to match your Java 17 installation
REM Common locations:
REM set JAVA_HOME=C:\Program Files\Java\jdk-17
REM set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot
REM set JAVA_HOME=C:\Program Files\OpenJDK\jdk-17.0.2

REM Replace this line with your actual Java 17 path:
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo Using Java 17 for this session...
java -version

REM Keep terminal open
cmd /k
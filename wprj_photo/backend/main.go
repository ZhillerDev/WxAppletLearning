package main

import (
	"wxPhoto/core"
	"wxPhoto/global"
	"wxPhoto/initial"
)

func main() {
	global.G_VIPER = initial.Viper()
	global.G_DB = initial.Gorm()
	core.InitServer()
}

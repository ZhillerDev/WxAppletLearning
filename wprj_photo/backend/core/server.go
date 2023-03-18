package core

import (
	"wxPhoto/global"
	"wxPhoto/router"
)

func InitServer()  {
	Router := router.RouteInitial()
	err := Router.Run(global.G_CONFIG.System.PORT)
	if err != nil{
		return
	}
}

package router

import (
	"github.com/gin-gonic/gin"
	"wxPhoto/middleware"
)

func RouteInitial() *gin.Engine  {
	Router := gin.Default()
	Router.Use(middleware.Cors())

	testGroup := Router.Group("")
	{
		testGroup.GET("/health", func(context *gin.Context) {
			context.JSON(200,gin.H{"status":"后端存活"})
		})
	}

	mainGroup := Router.Group("")
	{
		mainGroup.GET("/test")
		DataRouter(mainGroup)
		UserRouter(mainGroup)
	}

	return Router
}

package router

import (
	"github.com/gin-gonic/gin"
	"wxPhoto/api"
)

func DataRouter(Router *gin.RouterGroup)   {
	dataRouter := Router.Group("/data")
	{
		dataRouter.POST("/push",api.AddIssue)
	}
}
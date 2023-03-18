package router

import (
	"github.com/gin-gonic/gin"
	"wxPhoto/api"
)

func UserRouter(Router *gin.RouterGroup)  {
	userRouter:= Router.Group("/user")
	{
		userRouter.POST("/create",api.CreateUser)
		userRouter.GET("/info",api.GetUserInfo)
	}
}

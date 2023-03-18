package api

import (
	"github.com/gin-gonic/gin"
	"wxPhoto/service"
)

func CreateUser(c *gin.Context)  {
	service.CreateUserService(c)
}

func GetUserInfo(c *gin.Context)  {
	service.GetUserInfoService(c)
}

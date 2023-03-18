package service

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"wxPhoto/global"
	"wxPhoto/model"
	"wxPhoto/model/common"
)

func CreateUserService(c *gin.Context)  {
	nickname := c.PostForm("nickname")
	code := c.PostForm("code")
	req:=common.GetSession(code)
	openid:=req["openid"]

	var tempUser model.User
	global.G_DB.Where("open_id = ?",openid).Find(&tempUser)
	if tempUser.Nickname!=""{
		common.OkWithData(tempUser,c)
		return
	}

	user:=model.User{
		Nickname: nickname,
		OpenID: fmt.Sprintf("%v",openid),
	}
	fmt.Println(user)

	global.G_DB.Create(user)

	common.OkWithData(user,c)
}

func GetUserInfoService(c *gin.Context)  {
	code:= c.Query("code")
	req:=common.GetSession(code)
	openid:=req["openid"]

	var user model.User
	global.G_DB.Where("open_id = ?",openid).Find(&user)
	if user.Nickname!="" {
		common.OkWithData(user,c)
	}else {
		common.FailWithMessage("获取用户信息失败",c)
	}
}



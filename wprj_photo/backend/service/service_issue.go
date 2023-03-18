package service

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"wxPhoto/model/common"
)

func AddIssueService(c *gin.Context)  {
	fmt.Println(c.Request)
	name:=c.PostForm("name")
	content:=c.PostForm("content")
	var location string = c.PostForm("location")
	types:=c.PostForm("types")
	fmt.Println(name,content,location,types)

	common.OkWithMessage("ok",c)
}

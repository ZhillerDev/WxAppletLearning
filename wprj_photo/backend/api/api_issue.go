package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"wxPhoto/service"
)

func AddIssue(c *gin.Context)  {
	service.AddIssueService(c)
	fmt.Println("123")
}

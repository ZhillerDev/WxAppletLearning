package initial

import (
	"gorm.io/gorm"
	"wxPhoto/global"
)

func Gorm() *gorm.DB {
	switch global.G_CONFIG.System.DbType {
	case "mysql":
		return GormMysql()
	default:
		return GormMysql()
	}
}

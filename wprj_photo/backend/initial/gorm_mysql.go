package initial

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"wxPhoto/global"
)

func GormMysql() *gorm.DB {
	info := global.G_CONFIG.Mysql
	if info.Dbname == "" {
		return nil
	}

	mysqlConfig := mysql.Config{
		DSN:                       info.Dsn(),
		DefaultStringSize:         191,
		SkipInitializeWithVersion: false,
	}

	if db, err := gorm.Open(mysql.New(mysqlConfig)); err != nil {
		fmt.Println("完蛋，连接不上数据库！！！")
		return nil
	} else {
		fmt.Println("gorm 成功链接数据库")
		db.InstanceSet("gorm:table_options", "ENGINE="+info.Engine)
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(info.MaxIdleConns)
		sqlDB.SetMaxOpenConns(info.MaxOpenConns)
		return db
	}
}

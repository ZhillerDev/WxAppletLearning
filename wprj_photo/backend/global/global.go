package global

import (
	"github.com/spf13/viper"
	"gorm.io/gorm"
	"wxPhoto/config"
)

var (
	G_DB     *gorm.DB
	G_VIPER  *viper.Viper
	G_CONFIG config.Server
)

const (
	CONFIG_PATH = "config.yaml"
)

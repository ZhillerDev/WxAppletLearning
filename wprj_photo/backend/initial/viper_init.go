package initial

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
	"wxPhoto/global"
)

func Viper() *viper.Viper {
	v := viper.New()
	v.SetConfigFile(global.CONFIG_PATH)
	v.SetConfigType("yaml")

	err := v.ReadInConfig()
	if err != nil {
		fmt.Errorf("发生错误：%s \n", err)
	}

	v.WatchConfig()
	v.OnConfigChange(func(evt fsnotify.Event) {
		fmt.Println("配置文件发生改变", evt.Name)
		if err = v.Unmarshal(&global.G_CONFIG); err != nil {
			fmt.Println(err)
		}
	})

	if err = v.Unmarshal(&global.G_CONFIG); err != nil {
		fmt.Println(err)
	}

	fmt.Println("viper 配置完毕")

	return v
}

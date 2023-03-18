package config

type System struct {
	PORT   string    `mapstructure:"port" json:"port" yaml:"port"`
	DbType string `mapstructure:"db-type" json:"db-type" yaml:"db-type"`
}

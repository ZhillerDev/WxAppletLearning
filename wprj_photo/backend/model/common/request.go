package common

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"
)

func GetSession(code string) map[string]interface{} {
	params := url.Values{}
	requestUrl,err := url.Parse("https://api.weixin.qq.com/sns/jscode2session")
	if err != nil{
	}
	params.Set("appid","wx9eccc6b3d2611948")
	params.Set("secret","93e5376952e3015db8ec9a75d0d7d5db")
	params.Set("js_code",code)
	params.Set("grant_type","authorization_code")
	requestUrl.RawQuery = params.Encode()
	resp,err := http.Get(requestUrl.String())
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			return
		}
	}(resp.Body)

	body,err:= io.ReadAll(resp.Body)

	var res map[string]interface{}
	err2 := json.Unmarshal(body,&res)
	if err2 != nil {
	}

	return res
}

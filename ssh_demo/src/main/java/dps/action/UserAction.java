package dps.action;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionSupport;
import dps.bean.User;
import dps.service.WebService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAction extends ActionSupport {
	private WebService webService=null;
	public void setWebService(WebService webService){ this.webService=webService; }
	private Map<String,Object> jsonData;
	private String username;
	private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {return password;}
	public void setPassword(String password) {this.password = password;}
	public Map<String,Object> getJsonData() {
		return jsonData;
	}
	public void setJsonData(Map<String,Object> jsonData) {
		this.jsonData = jsonData;
	}

	public String getJsonList() {
		jsonData = new HashMap<String,Object>();
		List<User> list=webService.getUserList(username,password);
		if(list.size()==1){
			jsonData.put("msg", "200");
			jsonData.put("user",username);
		}else {
			jsonData.put("msg", "500");
		}
		return Action.SUCCESS;
	}
}

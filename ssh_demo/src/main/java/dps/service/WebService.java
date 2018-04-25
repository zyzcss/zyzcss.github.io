package dps.service;

import dps.bean.User;
import dps.dao.WebDao;
import java.util.List;

public class WebService {
    private WebDao webDao;
    public void  setWebDao(WebDao webDao){
        this.webDao=webDao;
    }
    public List<User> getUserList(String user,String password){
        List<User> list=webDao.getUserList(user,password);
        return list;
    }
}

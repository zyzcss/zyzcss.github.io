package dps.dao;

import dps.bean.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class WebDao {
    private SessionFactory sessionFactory;
    public void setSessionFactory(SessionFactory sessionFactory){
        this.sessionFactory=sessionFactory;
    }
    public List<User> getUserList(String user,String password){
        Session session=sessionFactory.getCurrentSession();
        Query query = session.createQuery("from User where user=:user and password=:password")
                .setParameter("user",user)
                .setParameter("password",password);
        List<User> list = query.list();
        return list;
    }
}

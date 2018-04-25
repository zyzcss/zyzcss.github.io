package dps.dao;

import dps.bean.User;
import org.hibernate.HibernateException;
import org.springframework.orm.hibernate5.HibernateTemplate;

public class UserDao {
    private HibernateTemplate template;

    public void setTemplate(HibernateTemplate template) {
        this.template = template;
    }
    public void save(User user)throws HibernateException {
        template.save(user);
    }
    public void update(User user)throws HibernateException {
        template.update(user);
    }
    public void delete(User user)throws HibernateException {
        template.delete(user);
    }
}

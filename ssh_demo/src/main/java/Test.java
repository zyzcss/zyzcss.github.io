import dps.bean.Content;
import dps.bean.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import java.util.List;

public class Test {
    public void runSql(){
        Configuration cfg = new Configuration();
        SessionFactory sf=cfg. configure().buildSessionFactory();
        //User customer=new User();//customer对象处于自由状态
        Session session=sf.getCurrentSession();
        Transaction tx=session.beginTransaction();
        //session.de(customer);//保存后customer对象处于持久化状态
        Query query = session.createQuery("from User");
        //2、使用Query对象的list方法得到数据集合
        List<User> list = query.list();
        //3、遍历集合获取数据
        for (User good : list) {
            System.out.println(good.getUser().toString()+good.getContent().size());
        }
        session.flush();//清空缓存后customer对象处于游离状态
        tx.commit();
        session.close();
    }
	public static void main(String[] args) {
        new Test().runSql();
        /*ApplicationContext act=new ClassPathXmlApplicationContext("applicationContext.xml");
        User u=act.getBean("user",User.class);
        System.out.println(u.getUser());*/



    }

}

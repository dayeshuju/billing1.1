package com.daye.sys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.daye.common.exception.ServiceException;
import com.daye.common.util.ShiroUtils;
import com.daye.sys.entity.SysUser;
import com.daye.sys.mapper.SysUserMapper;
import com.daye.sys.service.SysUserService;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;

/**
 * <p>
 * 系统用户 服务实现类
 * </p>
 *
 * @author 唐东东
 * @since 2019-06-18
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Autowired
    SysUserMapper sysUserMapper;

    @Override
    public boolean updateObject(String oldpwd, String newpwd) {
        if(StringUtils.isEmpty(oldpwd) || StringUtils.isEmpty(newpwd)){
            throw new ServiceException("数据不合法！！！");
        }
        SysUser user = sysUserMapper.selectById(ShiroUtils.getPrincipal().getId());

        SimpleHash oldM5pwd = new SimpleHash("MD5",oldpwd,user.getSalt());
        if(oldM5pwd.toHex().equals(user.getPassword())){
            String newSalt = UUID.randomUUID().toString();
            user.setSalt(newSalt);
            SimpleHash newM5pwd = new SimpleHash("MD5",newpwd,newSalt);
            user.setPassword(newM5pwd.toHex());
        }else {
            throw new ServiceException("旧密码错误");
        }
        sysUserMapper.updateById(user);
        return true;
    }
}

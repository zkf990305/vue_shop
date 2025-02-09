/**
 * 字段验证规则
 */
// 登录表单的验证规则对象
export const userLoginFormRulesMixin = {
    data() {
        return {
            loginFormRules: {
                // 验证用户名是否合法
                username: [{
                        required: true,
                        message: '请输入登录名称',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur',
                    },
                ],
                // 验证密码是否合法
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur',
                    },
                ],
            },

        }
    }
}
export const userFormRules = {
    data() {
        // 验证邮箱的规则
        var checkEmail = (rule, value, callback) => {
            // 验证邮箱的正则表达式
            const regEmail = /^\w+@\w+(\.\w+)+$/
            if (regEmail.test(value)) {
                return callback() // 合法邮箱
            }
            // 返回一个错误提示
            callback(new Error('请输入合法的邮箱'))
        }
        // 验证手机的规则
        var checkMobeli = (rule, value, callback) => {
            const regMobile = /^1[34578]\d{9}$/
            if (regMobile.test(value)) {
                return callback()
            }
            // 返回一个错误提示
            callback(new Error('请输入合法的手机号码'))
        }
        return {
            // 添加表单的验证规则对象
            addFormRules: {
                username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名的长度在3~10个字符之间',
                        trigger: 'blur',
                    },
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '用户名长度在 6 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
                email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobeli,
                        trigger: 'blur'
                    }
                ]
            },
            // 修改用户数据验证规则
            editFormRules: {
                email: [{
                        required: true,
                        message: '请输入用户邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true,
                        message: '请输入用户手机',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobeli,
                        trigger: 'blur'
                    }
                ]
            }
        }
    }
}
// 添加角色、编辑角色 ---- 验证规则
export const rolesFormRulesMixin = {
    data() {
        return {
            addFormRules: {
                roleName: [{
                        required: true,
                        message: '请输入角色名字',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '输入的范围是 3 ~ 10 为字符',
                        triggetr: 'nlur'
                    }
                ],
                roleDesc: [{
                        required: true,
                        message: '请输入角色描述',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '输入的范围是 5 ~ 20 为字符',
                        triggetr: 'nlur'
                    }
                ]
            },
            editFormRules: {
                roleName: [{
                        required: true,
                        message: '请输入角色名字',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '输入的范围是 3 ~ 10 为字符',
                        triggetr: 'nlur'
                    }
                ],
                roleDesc: [{
                        required: true,
                        message: '请输入角色描述',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '输入的范围是 5 ~ 20 为字符',
                        triggetr: 'nlur'
                    }
                ]
            }
        }
    }
}
// 添加分类 商品分类  ---- 验证规则
export const cateAddFormRulesMixin = {
    data() {
        return {
            addCateFormRules: {
                cat_name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }]
            },
        }
    },
}
// 分类参数
export const paramsFormRulesMixin = {
    data() {
        return {
            // 添加表单的验证规则
            addFormRules: {
                attr_name: [{
                        required: true,
                        message: '请输入添加的分类',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 10,
                        message: '长度在 2 到 10 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            // 修改表单的验证
            editFormRules: {
                attr_name: [{
                        required: true,
                        message: '请输入修改的信息',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 10,
                        message: '长度在 2 到 10 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    }
}
// 添加商品 验证规则
export const goodsAddFormRulesMixin = {
    data() {
        return {
            // 添加商品验证规则
            addFormRules: {
                goods_name: [{
                        required: true,
                        message: '请输入商品的名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 30,
                        message: '请输入 2 ~ 30 范围的字符',
                        trigger: 'blur'
                    }
                ],
                goods_price: [{
                    required: true,
                    message: '请输入商品的价格',
                    trigger: 'blur'
                }],
                goods_weight: [{
                    required: true,
                    message: '请输入商品的重量',
                    trigger: 'blur'
                }],
                goods_number: [{
                    required: true,
                    message: '请输入商品的数量',
                    trigger: 'blur'
                }],
                goods_cat: [{
                    required: true,
                    message: '请选择商品分类',
                    trigger: 'blur'
                }]
            }
        }
    }
}
// 修改订单地址
export default
const editOrdersFormRulesMinix = {
    data() {
        return {
            // 修改表单的验证规则
            addressFormRules: {
                address1: [{
                    required: true,
                    message: '请选择省市区/县',
                    trigger: 'blur'
                }],
                address2: [{
                    required: true,
                    message: '请填写详细地址',
                    trigger: 'blur'
                }]
            }
        }
    }
}
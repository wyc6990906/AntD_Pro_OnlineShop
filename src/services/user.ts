import request from '@/utils/request';


export async function queryCurrent(): Promise<any> {
  return request('/admin/user');
}

//获取用户列表
export async function getUsers({params}: { params: object }): Promise<any> {
  // console.log(params)
  return request('/admin/users', {params});
}

//启用账户
export async function lockUser(userId: { userId: string }): Promise<any> {
  return request.patch(`/admin/users/${userId}/lock`);
}

//添加用户
export async function addUser(form: { form: object }): Promise<any> {
  return request.post('/admin/users', {params: form});
}

//修改用户
export async function updateUser(userId: string, form: { form: object }): Promise<any> {
  return request.put(`/admin/users/${userId}`, {params: form});
}

//查看用户详情
export async function getUserDetail(userId: { userId: string }): Promise<any> {
  return request.get(`/admin/users/${userId}`);
}

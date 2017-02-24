<?php 

class Upload{

    public $size = 5 * 1024 * 1024; // 图片控制在5M

    public $type = ['image/jpg','image/jpeg','image/gif','image/png','image/bmp'];

    public function base64_upload() {
        $postData = $_POST;

        $base64 = $postData['image'];

        $base64_image = str_replace(' ', '+', $base64);
        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)){
            //匹配成功
            if($result[2] == 'jpeg'){
                $image_name = $this->generate_string().'.jpg';
                //纯粹是看jpeg不爽才替换的
            }else{
                $image_name = $this->generate_string().'.'.$result[2];
            }
            $image_file = $this->createDir() . $image_name;
            //服务器文件存储路径
            if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $base64_image)))){
                return ['status'=>200,'store_path'=>$image_file];
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function img_upload(){
        // 判断大小
        if($_FILES["files"]["size"] > $this->size){
            return ['status'=>400,'message'=>'文件太大了!'];
        }

        // 判断类型
        if(!in_array($_FILES["files"]["type"], $this->type)){
            return ['status'=>400,'message'=>'文件类型错误!'];
        }
        
        $result = explode('.', $_FILES["files"]["name"]);
        $name = $this->generate_string() . '.' . end($result);
        move_uploaded_file($_FILES["files"]["tmp_name"],iconv("UTF-8","gb2312",$this->createDir() . $name));
        return ['status'=>200,'store_path'=>$this->createDir() . $name];
    }

    private function generate_string( $length = 8 ) { 
        // 密码字符集，可任意添加你需要的字符 
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $string = ''; 
        for ( $i = 0; $i < $length; $i++ ) 
        { 
            // 这里提供两种字符获取方式 
            // 第一种是使用 substr 截取$chars中的任意一位字符； 
            // 第二种是取字符数组 $chars 的任意元素 
            // $password .= substr($chars, mt_rand(0, strlen($chars) – 1), 1); 
            $string .= $chars[ mt_rand(0, strlen($chars) - 1) ];
        } 
        return $string;
    }

    /**
     * 创建上传路径
     * @return [type] [description]
     */
    private function createDir(){
        $dir = './upload/' . date('Ymd');

        if(!file_exists($dir)){
            mkdir($dir);
        }

        return $dir . '/';
    }

}

$getData = $_GET;

$upload = new Upload();
if(isset($getData['type'])){
    if($getData['type'] == 'base64'){
        $res = $upload->base64_upload();
    }else if($getData['type'] == 'img'){
        $res = $upload->img_upload();
    }
    echo json_encode($res);
}


die;
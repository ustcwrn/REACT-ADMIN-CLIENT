import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import { useState } from 'react';
import { reqDeleteImg } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function PicturesWall(props, ref) {
    let imgs;
    if (props.imgs && props.imgs.length > 0) {
        let fileList = props.imgs.map((img, index) => ({
            uid: -index,
            name: img,
            statues: 'done',
            url: BASE_IMG_URL + img,
        }))
        imgs = fileList

    } 
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(imgs || []);
    const handleCancel = () => setPreviewOpen(false);
    // 预览
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = async ({ fileList: newFileList, file }) => {
        if (file.status === 'done') {
            const res = file.response;
            if (res.status === 0) {
                message.success('图片上传成功！');
                const { name, url } = res.data;
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url;
            } else {
                message.error('上传图片失败！');
            }
        } else if (file.status === 'removed') {  // 删除图片
            const res = await reqDeleteImg(file?.response?.data?.name);
            if (res.status === 0) message.success('删除图片成功！');
            else message.error('删除图片失败！');
        }
        // 更新fileList的状态
        setFileList(newFileList);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传
            </div>
        </div>
    );
    return (
        <div>
            <Upload
                action="/manage/img/upload"
                accept='image/*'
                name='image'
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                ref={ref}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%'
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    )
}

export default React.forwardRef(PicturesWall);
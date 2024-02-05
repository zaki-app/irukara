import { Slider } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Cropper, { Area } from 'react-easy-crop';

interface CropImageProps {
  fileUrl: string;
  setChange: Dispatch<SetStateAction<boolean>>;
  s3upload: (e: any) => void;
}

export default function CropImage({
  fileUrl,
  setChange,
  s3upload,
}: CropImageProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isAnimation, setAnimation] = useState<boolean>(false);

  function onCropComplete(croppedArea: Area, croppedAreaPixels: Area) {
    console.log('これは何が入る', croppedArea, croppedAreaPixels);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 0.3);
  }, []);

  return createPortal(
    <>
      {/* 背景をスクロールしないように固定 */}
      <style>{'body {overflow: hidden}'}</style>
      <div
        draggable={false}
        className={`fixed inset-0 flex justify-center items-center z-modal z-[11] transition-all w-full h-screen overflow-auto
                  ${
                    isAnimation
                      ? 'visible bg-black/10 backdrop-blur-sm ease-linear'
                      : 'invisible'
                  }
                  `}
      >
        <div
          className={`bg-white rounded-xl shadow transition-all w-[500px] h-[500px] flex flex-col ${
            isAnimation
              ? 'scale-100 opacity-100 ease-linear'
              : 'scale-125 opacity-0 ease-linear'
          }`}
        >
          <div className='fixed top-[1rem] w-full h-[400px] bg-red-200'>
            <Cropper
              image={fileUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(e1, e2) => onCropComplete(e1, e2)}
              onZoomChange={setZoom}
              showGrid={false}
              cropShape='round'
              objectFit='contain'
            />
          </div>
          {/* <div className='fixed bottom-[2rem]'>
            <Slider
              value={zoom}
              min={1}
              step={0.01}
              onChange={(zoom) => setZoom(zoom)}
            />
          </div> */}
          <div className='fixed bottom-[2rem]'>
            <div className='flex gap-2 justify-center'>
              <button onClick={() => setChange(false)}>キャンセル</button>
              <button onClick={(e) => s3upload(e)}>変更</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('app-modal') as HTMLElement,
  );
}

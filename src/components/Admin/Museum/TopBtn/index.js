import Image from 'next/image';
import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import download from '../../../../assets/icons/Admin/mainAdmin/download.svg';
import plus from '../../../../assets/icons/Admin/mainAdmin/plus1.svg';
import styles from './style.module.css';

const index = ({ router, pathname, qrCodes }) => {
  console.log(qrCodes)
  const qrCodess = qrCodes?.data?.length > 2 && qrCodes?.data
    ?.map(item => item.qr_code)
    ?.filter(qr_code => qr_code && qr_code.startsWith('https'));

  async function handleDownloadAsZip(imageUrls) {
    try {
      const zip = new JSZip();
      const folder = zip.folder('qr_codes');

      for (const [index, imageUrl] of imageUrls.entries()) {
        const response = await fetch(imageUrl, { mode: 'cors' });
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const filename =imageUrl.split('/')[5].slice(8);

        folder.file(filename, blob); 
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'qr_codes.zip');
    } catch (error) {
      console.error('Error while creating the ZIP file:', error);
    }
  }

  return (
    <div className='flex items-center gap-3'>
      <div className={styles.button} onClick={() => handleDownloadAsZip(qrCodess)}>
        QR kodları ZIP ilə yüklə
        <Image src={download} alt='download' />
      </div>
      <div
        className={styles.button}
        onClick={() =>
          router.push(`${pathname}/add-exhibit?lang=${pathname.split('/')[1]}`)
        }
      >
        Əlavə et
        <Image src={plus} alt='plus' />
      </div>
    </div>
  );
};

export default index;

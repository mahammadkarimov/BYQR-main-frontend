"use client";
import React, { useState } from "react";
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetHotelServiceWithSlug, HotelServiceUpdate, MealCategoryRead, MealCategoryUpdate } from "@/services/api/dataApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const page = () => {
  const [serviceData, setServiceData] = useState()
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("Admin")

  const body = {
    title: serviceData?.title_az,
    icon: selectedImage ? selectedImage : null,
    order_number: serviceData?.order_number
  };

  const { _ } = useQuery(['serviceWithSlug'], () => GetHotelServiceWithSlug(searchParams.get('service')), {
    onSuccess: (data) => {
      console.log(data)
      let updatedObject = { ...serviceData }
      updatedObject.title_az = data?.data?.title_az;
      updatedObject.icon = data?.data?.icon;
      updatedObject.order_number = data?.data?.order_number;
      setServiceData(updatedObject)
    }
  })

  const { mutate: updateService } = useMutation((data) => HotelServiceUpdate(data, searchParams.get('service')), {
    onSuccess: () => {
      // location.href = `/${pathname.slice(1, 3)}/admin/technical-services?panel=hotel`
      toast.success(t('Edited successfully'))
      // queryClient.invalidateQueries(["serviceWithSlug"]);
    },
    onError: () => {
      toast.error(t('Oops, Something went wrong!'))
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      return
    }
  };

  const handleSubmit = () => {
    updateService(body);
  };

  const handleChangeCategoryName = (e) => {
    const updatedObject = { ...serviceData };
    updatedObject.title_az = e.target.value;
    setServiceData(updatedObject)
  }

  const handleChangeCategoryOrder = (e) => {
    const updatedObject = { ...serviceData };
    updatedObject.order_number = e.target.value;
    setServiceData(updatedObject)
  }

  return (
    <AdminLayout>
      <div className="ms-content-wrapper flex justify-center">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh">
              <div className="ms-panel-header">
                <h6>{t("Edit Service Form")}</h6>
              </div>
              <div className="ms-panel-body">
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation clearfix"
                  noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-4">
                      <label htmlFor="validationCustom18">
                        {t("Service Name")}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t("Service Name")}
                          required
                          value={serviceData?.title_az}
                          onChange={(e) => handleChangeCategoryName(e)}
                        />
                        <div className="valid-feedback">{t("Looks good!")}</div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <label htmlFor="validationCustom18">
                        {t("Service Order")}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t("Service Order")}
                          required
                          value={serviceData?.order_number}
                          onChange={(e) => handleChangeCategoryOrder(e)}
                        />
                        <div className="valid-feedback">{t("Looks good!")}</div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="validationCustom12"
                        style={{ marginBottom: "10px" }}>
                        {t("Service Icon")}
                      </label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="validatedCustomFile"
                          onChange={handleImageChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="validatedCustomFile">
                          {selectedImage
                            ? selectedImage.name
                            : t("Upload Images")}
                        </label>
                        <div className="invalid-feedback">
                          Example invalid custom file feedback
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="ms-panel-header new">
                <button
                  onClick={handleSubmit}
                  className="btn btn-secondary d-block"
                  type="submit">
                  {t('Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;

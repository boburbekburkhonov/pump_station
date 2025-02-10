import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DistrictMiddleware from './districtMiddleware';
import OrganizationMiddleware from './organizationMiddleware';
import RegionMiddleware from './regionMiddleware';
import RootMiddleware from './rootMiddleware';
import UserMiddleware from './userMiddleware';
import { getDataApi } from '../../utils';

function ReturnRoots() {
  const roleType = localStorage.getItem("roles")
  const token = localStorage.getItem("access_token");
  const [roleData, setRoleData] = useState("")

  const getRoleType = useCallback(async () => {
    const res = await getDataApi(`roles/findById?id=${roleType}`, token)

    setRoleData(res.data.data.code)
  }, [roleType, token])

  useEffect(() => {
    getRoleType()
  }, [getRoleType])


  return (
    <>
      {
        roleData === "root" && <RootMiddleware />
      }
      
      {
        roleData === "user" && <UserMiddleware />
      }
      
      {
        roleData === "organization" && <OrganizationMiddleware />
      }
      
      {
        roleData === "region" && <RegionMiddleware />
      }
      
      {
        roleData === "district" && <DistrictMiddleware />
      }
    </>
  )
}

export default ReturnRoots
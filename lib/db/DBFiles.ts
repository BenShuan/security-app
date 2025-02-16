import prisma from "../prisma"
import { handleError } from '@/lib/db/utils'
import { Prisma } from '@prisma/client'
import { findOrCreateGuard } from "./DBEmployee"


export const createFile=async(file:Prisma.FileCreateInput)=>{
  try {
    
    const guard=await findOrCreateGuard(file.guardFiles.connect?.employeeId||"")

    if(!guard.success){
      return {success:false,error:'Guard not found'}
    }

    console.log('guard',guard.data)
    const newFile=await prisma.file.create({
      data:{
          url:file.url,
          name:file.name,
          downloadUrl:file.downloadUrl,
          guardFiles:{
            connect:{
              employeeId:guard.data?.employeeId
            }
          }
      }
    })

    return {success:true,data:newFile}
  } catch (error) {
    return handleError(error)
  }

}

export const createFiles=async(files:Prisma.FileCreateManyInput[])=>{
  try {
    console.log('files',files[0])
    const guard=await findOrCreateGuard(files[0].guardId||"")

    console.log('guard',guard)

    if(!guard.success){
      return {success:false,error:'Guard not found'}
    }

  
    const newFiles=await prisma.file.createMany({
      data:files
    })

  // const newFiles=await prisma.guard.update({
  //     where:{
  //       employeeId:guard.data?.employeeId
  //     },
  //     data:{
  //       files:{
  //         createMany:{
  //           data:files
  //         }
  //       }
  //   }})

    return {success:true,data:newFiles} 
  } catch (error) {
    return handleError(error)
  }
}

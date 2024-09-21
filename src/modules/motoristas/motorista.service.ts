import { Injectable } from '@nestjs/common';
import { motoristaDTO } from './motorista.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class MotoristaService {
  constructor(private prisma: PrismaService){}

  async  createMotorista(data: motoristaDTO) {
      const motoristaExist = await this.prisma.motorista.findFirst({
          where:{
              cpf_cnpj: data.cpf_cnpj
          }
      })

      if(motoristaExist){
          throw new Error("Motorista ja esta cadastrado!")
      }      

      await this.prisma.motorista.create({
         data
      })
      .then(res => {return res})
      .catch(erro => {return erro})
    }
  

  async findAllMotorista() {
   return await this.prisma.motorista.findMany()
    
   
  }

  async findOneMotorista(placa: string) {
    return await this.prisma.motorista.findMany({
      where:{
        placa:{
          contains: placa
        }
      }
  })
  }

  async updateMotorsita(id: number, data: motoristaDTO) {
    const motoristaExist = await this.prisma.motorista.findFirst({
      where:{
          cpf_cnpj: data.cpf_cnpj
      }
    })
  

  if(!motoristaExist){
      throw new Error("Motorista não encontrado")
  }

  if(motoristaExist && motoristaExist.cpf_cnpj !== data.cpf_cnpj){
      throw new Error("Ja existe esse cnpj ou cpf cadastrado.")
  }

  motoristaExist.name = data.name ?? motoristaExist.name;
  motoristaExist.placa = data.placa ?? motoristaExist.placa;

  return await this.prisma.motorista.update({
      data:{
        name: data.name,
        gerenciamento_risco: data.gerenciamento_risco,
        tipo_veiculo: data.tipo_veiculo,
        placa: data.placa
      },
      where:{
          id
      }
  })
  }

  async deleteMotorista(id: number) {
    const motoristaExist = await this.prisma.motorista.findFirst({
      where:{id}
    })

    if(!motoristaExist){
      throw new Error("Motorista não encontrado")
  }


  return await this.prisma.motorista.delete({
      where:{id}
  })
  }
}

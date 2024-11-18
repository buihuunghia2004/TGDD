'use strict';
import { RoleEntity } from '@/api/user/entities/role.entity';
import { type TransformFnParams } from 'class-transformer';

export const lowerCaseTransformer = (params: TransformFnParams): string =>
  params.value?.toLowerCase().trim();

export const roleTransformer = (params: TransformFnParams): string[] => {
  return params.value?.map((role: RoleEntity) => role.roleName) || [];
}
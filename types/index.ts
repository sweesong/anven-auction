import { SVGProps } from "react";
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

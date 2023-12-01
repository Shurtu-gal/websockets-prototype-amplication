import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { OrganizationResolverBase } from "./base/organization.resolver.base";
import { Organization } from "./base/Organization";
import { OrganizationService } from "./organization.service";
import { WebSocketGateway } from "src/providers/websockets/websockets.gateway";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Organization)
export class OrganizationResolver extends OrganizationResolverBase {
  constructor(
    protected readonly service: OrganizationService,
    protected readonly websocketService: WebSocketGateway,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, websocketService, rolesBuilder);
  }
}

import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import  Errors, {  HttpCode, Message } from "../libs/types/errors";
import { MemberType } from "../libs/types/enums/member.enum";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();

    if (exist) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    const created = await this.memberModel.create(input);

    const memberObject = created.toObject();
    delete memberObject.memberPassword;

    return memberObject as Member;
  }
}

export default MemberService;

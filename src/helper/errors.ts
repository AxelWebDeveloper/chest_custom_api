import { HttpException, HttpStatus } from '@nestjs/common';

const noFirebasseUUID = () => {
  return new HttpException('NO_FIREBASE_UUID', HttpStatus.UNAUTHORIZED);
};
const isUnauthorizedHttpException = () => {
  return new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
};
const noUserExistsHttpException = () => {
  return new HttpException('NO_USER_EXISTS', HttpStatus.NOT_FOUND);
};
const noRoleAllowedHttpException = () => {
  return new HttpException('ROLE_NOT_ALLOWED', HttpStatus.UNAUTHORIZED);
};
const noPlaylistExistsHttpException = () => {
  return new HttpException('NO_PLAYLIST_EXISTS', HttpStatus.NOT_FOUND);
};
const noSequenceExistsHttpException = () => {
  return new HttpException('NO_SEQUENCE_EXISTS', HttpStatus.NOT_FOUND);
};
const noLabelExistsHttpException = () => {
  return new HttpException('NO_LABEL_EXISTS', HttpStatus.NOT_FOUND);
};
const noLabelOptionExistsHttpException = () => {
  return new HttpException('NO_LABEL_OPTION_EXISTS', HttpStatus.NOT_FOUND);
};
const noActionLogExistsHttpException = () => {
  return new HttpException('NO_ACTIONLOG_EXISTS', HttpStatus.NOT_FOUND);
};
const noOrganisationExistsHttpException = () => {
  return new HttpException('NO_ORGANISATION_EXISTS', HttpStatus.NOT_FOUND);
};
const noBucketNameExistsHttpException = () => {
  return new HttpException('NO_BUCKETNAME_EXISTS', HttpStatus.NOT_FOUND);
};
const noCodageExistsHttpException = () => {
  return new HttpException('NO_CODAGE_EXISTS', HttpStatus.NOT_FOUND);
};
const noGameExistsHttpException = () => {
  return new HttpException('NO_GAME_EXISTS', HttpStatus.NOT_FOUND);
};
const noOrganisationForUserHttpException = () => {
  return new HttpException(
    'NO_ORGANISATION_FOR_USER_EXISTS',
    HttpStatus.NOT_FOUND,
  );
};
const userAlreadyHaveOrganisation = () => {
  return new HttpException(
    'NO_ORGANISATION_FOR_USER_EXISTS',
    HttpStatus.UNAUTHORIZED,
  );
};

const noProGameXmlUrlException = () => {
  return new HttpException(
    'NO_XML_URL_EXISTS_FOR_THIS_PROGAME',
    HttpStatus.NO_CONTENT,
  );
};

const noProGameException = () => {
  return new HttpException('NO_PROGAME_EXIST', HttpStatus.NOT_FOUND);
};
export {
  isUnauthorizedHttpException,
  noUserExistsHttpException,
  noRoleAllowedHttpException,
  noPlaylistExistsHttpException,
  noSequenceExistsHttpException,
  noLabelExistsHttpException,
  noLabelOptionExistsHttpException,
  noActionLogExistsHttpException,
  noOrganisationExistsHttpException,
  noBucketNameExistsHttpException,
  noFirebasseUUID,
  noOrganisationForUserHttpException,
  userAlreadyHaveOrganisation,
  noCodageExistsHttpException,
  noGameExistsHttpException,
  noProGameXmlUrlException,
  noProGameException,
};

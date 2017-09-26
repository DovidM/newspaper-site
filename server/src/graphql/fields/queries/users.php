<?php

require_once __DIR__ . '/../../../../vendor/autoload.php';
require_once(__DIR__ . '/../../types/user.php');

use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Field\AbstractField;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQL\Type\Scalar\IdType;
use Youshido\GraphQL\Type\ListType\ListType;


class UsersField extends AbstractField {

    public function build(FieldConfig $config) {

        $config->addArguments([
            'id' => new IdType(),
            'profileLink' => new StringType()
        ]);
    }

    public function getType() {
        return new ListType(new UserType());
    }

    // TODO: deal with jwt
    public function resolve($root, array $args, ResolveInfo $info) {

        $sanitized = filter_var($args, FILTER_SANITIZE_STRING);

        $where = Db::setPlaceholders($args);


        // basic fields, no authentication or filtering needed
        return Db::query("SELECT id, f_name AS firstName, m_name AS middleName, l_name AS lastName,
          email, level FROM users WHERE {$where}", $args)->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>